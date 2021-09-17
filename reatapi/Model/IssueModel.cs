using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reatapi.Model
{
    public class IssueModel
    {
        public string SKUNumber{get;set;}
        public string EANNumber { get; set; }
        public int ExpectedNumber { get; set; }
        public int ActualNumber { get; set; }
        public string ProductName { get; set; }
        public string Store { get; set; }
        public string ReportedDate { get; set; }
        public bool IsDepot { get; set; }
    }

    public static class SessionExtensions
    {
        public static T GetComplexData<T>(this ISession session, string key)
        {
            var data = session.GetString(key);
            if (data == null)
            {
                return default(T);
            }
            return JsonConvert.DeserializeObject<T>(data);
        }

        public static void SetComplexData(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }
    }
}
