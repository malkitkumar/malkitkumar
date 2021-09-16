using Microsoft.AspNetCore.Mvc;
using reatapi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reatapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        // GET: api/<IssueController>
        [HttpGet]
        public IEnumerable<IssueModel> Get()
        {

            return GetCurrentIssues();
        }

        // GET api/<IssueController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<IssueController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<IssueController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<IssueController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private List<IssueModel> GetCurrentIssues()
        {
            var list = new List<IssueModel>();
            if (!HttpContext.Session.Keys.Contains("Items"))
            {
                list.Add(new IssueModel { ActualNumber = 10, ExpectedNumber = 12, EANNumber = "Ad1357172", ProductName = "Baked Beans", SKUNumber = "5323444" });
                list.Add(new IssueModel { ActualNumber = 5, ExpectedNumber = 10, EANNumber = "Af1357173", ProductName = "Pack of chocs", SKUNumber = "5323444" });
                list.Add(new IssueModel { ActualNumber = 6, ExpectedNumber = 8, EANNumber = "Af1357174", ProductName = "Tea Bags", SKUNumber = "5323444" });
                list.Add(new IssueModel { ActualNumber = 8, ExpectedNumber = 10, EANNumber = "Am1357132", ProductName = "Pasta", SKUNumber = "5323444" });
                list.Add(new IssueModel { ActualNumber = 2, ExpectedNumber = 5, EANNumber = "Ac1357172", ProductName = "Baby Milk", SKUNumber = "5323444" });
                list.Add(new IssueModel { ActualNumber = 3, ExpectedNumber = 8, EANNumber = "Ab1457172", ProductName = "Rice", SKUNumber = "5323444" });
                HttpContext.Session.SetComplexData("Items", list);
            }

            list = HttpContext.Session.GetComplexData<List<IssueModel>>("Items");
            return list;
        }

        
    }
}
