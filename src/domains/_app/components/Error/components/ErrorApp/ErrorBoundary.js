// TODO: Finish error customization
// not sure if i really want to use this - i might create my own modal for this

import React from "react";
import ErrorApp from "./ErrorApp";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false, error: undefined };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        console.log("getDerivedStateFromError: ", { error });
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        console.log("componentDidCatch: ", { error, errorInfo });
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            /*
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <Button
                    size="medium"
                    type="button"
                    label="Try again?"
                    customStyles={customStyles}
                    onClick={() => this.setState({ hasError: false })}
                />            
                </div>
            );
            */
            <ErrorApp error={this.state.error} />;
        }

        // Return children components in case of no error

        return this.props.children;
    }
}

export default ErrorBoundary;
