using System;
using System.Net;

namespace Application.Errors
{
    public class RestExceptions : Exception
    {
        public HttpStatusCode Code { get; }
        public object Errors { get; }
        public RestExceptions(HttpStatusCode code, object errors = null)
        {
            Errors = errors;
            Code = code;
        }
    }
}