namespace API.ErrorResponse
{
    public class ErrorMessage
    {
        public ErrorMessage(int errorCode, string message = null)
        {
            ErrorCode = errorCode;
            Message = message ?? GetErrorMessageForCode(errorCode);
        }

       

        public int ErrorCode { get; set; }
        public string? Message { get; set; }

        private string GetErrorMessageForCode(int errorCode)
        {
            switch (errorCode)
            {
                case 404:
                    return "Resource Not Found";
                default:
                    return "Something Went Wrong";
            }
        }
    }
}
