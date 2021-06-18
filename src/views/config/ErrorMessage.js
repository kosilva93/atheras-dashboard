const ErrorMessage = (error) => {
    error = error.error;
    return (
        <>
            {error && <><label style={{ color: '#bd0d00' }}>ERROR: {error}</label></>}
        </>
    );
}

export default ErrorMessage;
