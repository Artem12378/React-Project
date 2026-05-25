import { Component, type ErrorInfo, type PropsWithChildren } from "react";
import { NavLink } from "react-router";
import { Typography, Button, Box } from "@mui/material";

type ErrorHandlerProps = PropsWithChildren;

type ErrorHandlerState = {
    hasError: boolean;
    error?: Error;
};

export class ErrorHandler extends Component<ErrorHandlerProps, ErrorHandlerState> {
    constructor(props: ErrorHandlerProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Typography variant="h1" gutterBottom>
                        Something went wrong
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {this.state.error?.message || "Please try to reload the page."}
                    </Typography>
                    <Button
                        component={NavLink}
                        to="/auth"
                        variant="contained"
                        color="primary"
                        onClick={this.handleReset}
                        sx={{ mt: 2 }}
                    >
                        Go back to the main page
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}