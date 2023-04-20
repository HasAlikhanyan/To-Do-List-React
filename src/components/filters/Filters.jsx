import { memo, useEffect, useState } from "react";
import { Accordion, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRefresh } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import styles from "./filters.module.css";

function Filters(props) {
    // const [filters, setFilters] = useState({
    //     search: "",
    //     status: "",
    //     create_lte: "",
    //     create_gte: "",
    //     complete_lte: "",
    //     complete_gte: "",
    //     sort: "",
    // });

    const [search, setSearch] = useState("");

    const onStatusChange = (event)=>{
        console.log(event.target.value)
    };

    const onUpdateSearch = (e) => {
        const value  = e.target.value;
        setSearch(value); 
    }

    const resetFilters = () => {
        setSearch("");
    }

    const onSearch = () => {
        if(search.length === 0) {
            resetFilters();
        }
        props.onUpdateSearch(search);
    }

    // useEffect(()=> {
    //     props.onUpdateSearch(search);
    // }, [search])

    return (
        <Accordion className='mb-4'>
            <Accordion.Item 
                eventKey="0">
                <Accordion.Header>
                    <Form
                        className={`${styles.form} d-flex`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value = {search}
                            onChange = {onUpdateSearch}
                        />
                        <span
                            className={`btn btn-outline-success me-2 ${styles.iconSearch}`}
                            title="Apply filters"
                        >
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className={styles.icon}
                                onClick={onSearch}
                                />
                        </span>
                        <span 
                            className={`btn btn-outline-info ${styles.iconResetFilters}`} 
                            title="Reset filters"
                            onClick={resetFilters}
                            >
                            <FontAwesomeIcon icon={faRefresh} className={styles.iconReset} />
                        </span>
                    </Form>
                </Accordion.Header>
                <Accordion.Body>
                    <Container fluid={true}>
                        <Row>
                            <Col sm={6} md={4} lg={3} className="text-center">
                                <fieldset className={styles.filterItem}>
                                <legend>Created lte</legend>
                                <DatePicker
                                    showIcon
                                    // selected={date}
                                    // onChange={setDate}
                                />
                                </fieldset>
                            
                                
                            </Col>
                            <Col sm={6} md={4} lg={3} className="text-center">
                                <fieldset className={styles.filterItem}>
                                <legend>Created gte</legend>
                                <DatePicker
                                    showIcon
                                    // selected={date}
                                    // onChange={setDate}
                                />
                                </fieldset>
                            </Col>
                            <Col sm={6} md={4} lg={3} className="text-center">
                                <fieldset className={styles.filterItem}>
                                <legend>Completed lte</legend>
                                <DatePicker
                                    showIcon
                                    // selected={date}
                                    // onChange={setDate}
                                />
                                </fieldset>
                            </Col>
                            <Col sm={6} md={4} lg={3} className="text-center">
                                <fieldset className={styles.filterItem}>
                                <legend>Completed gte</legend>
                                <DatePicker
                                    showIcon
                                    // selected={date}
                                    // onChange={setDate}
                                />
                                </fieldset>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="text-center">
                                <fieldset>
                                <legend className={styles.myLegend}>Status</legend>
                                <Form.Select 
                                    aria-label="Status"
                                    onChange={onStatusChange}
                                >
                                    <option value="active">Active</option>
                                    <option value="completed">Done</option>
                                </Form.Select>
                                </fieldset>
                            </Col>
                            <Col sm={6} className="text-center">
                                <fieldset>
                                <legend className={styles.myLegend}>Sort</legend>
                                <Form.Select aria-label="Status">
                                    <option value="a-z">A-Z</option>
                                    <option value="z-a">Z-A</option>
                                </Form.Select>
                                </fieldset>
                            </Col>
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default memo(Filters);
