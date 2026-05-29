import {
    selectFilter,
    selectTodos,
    setCompletedFilter,
    setLimit,
    setPage,
    setSearch
} from "../model/Store/todosStore.ts";
import { useAppDispatch, useAppSelector } from "../../../app/store.ts";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup,
    Input,
    MenuItem,
    Select, Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

const TodosFilters = () => {
    const filters = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();
    const todosLength = useAppSelector(selectTodos).length;


    const handleFilterChange = (filter: 'all' | 'true' | 'false') => {
        dispatch(setCompletedFilter(filter));
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    const handleChangeLimit = (e: SelectChangeEvent<number>) => {
        dispatch(setLimit(Number(e.target.value)));
    };

    const handlePrevClick = ()=> {
        if(todosLength ===1)return
        dispatch(setPage(filters.page -1));
    }


    const handleNextClick = ()=> {
        if(todosLength !== filters.limit)return
        dispatch(setPage(filters.page +1));
    }

    return (
        <>
            <Accordion>
                <AccordionSummary>Filters</AccordionSummary>
                <AccordionDetails>
                    <Input
                        value={filters.search || ''}
                        onChange={handleChangeSearch}
                    />
                    <br />

                    <ButtonGroup>
                        <Button
                            onClick={() => handleFilterChange('true')}
                            variant={filters.completed === 'true' ? 'contained' : 'outlined'}
                        >
                            Completed
                        </Button>
                        <Button
                            onClick={() => handleFilterChange('false')}
                            variant={filters.completed === 'false' ? 'contained' : 'outlined'}
                        >
                            In Progress
                        </Button>
                        <Button
                            onClick={() => handleFilterChange('all')}
                            variant={filters.completed === 'all' ? 'contained' : 'outlined'}
                        >
                            Show All
                        </Button>
                    </ButtonGroup>
                    <br />
                    <Typography>Show by:</Typography>
                    <Select
                        value={filters.limit}
                        variant="filled"
                        onChange={handleChangeLimit}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </AccordionDetails>
            </Accordion>

            <ButtonGroup>
                <Button onClick={handlePrevClick} disabled={filters.page === 1}>Prev</Button>
                <Button onClick={handleNextClick} disabled={todosLength !== filters.limit} >Next</Button>
            </ButtonGroup>
        </>

    );
};

export default TodosFilters;