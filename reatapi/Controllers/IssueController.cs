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
        [HttpGet("GetDepotDashboard")]
        public IEnumerable<IssueModel> GetDepotDashboard()
        {

            return GetDepotCurrentIssues();
        }
        // GET api/<IssueController>/5
        [HttpGet("GetDetails/{id}/{isDepot}")]
        public IssueModel GetDetails(string id, string isDepot)
        {
            if (isDepot.ToLower()=="true")
            {
                return GetDepotCurrentIssues().Where(x => x.EANNumber == id).FirstOrDefault();
            }
            else
            {
                return GetCurrentIssues().Where(x => x.EANNumber == id).FirstOrDefault();
            }
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
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 10, ExpectedNumber = 12, EANNumber = "Ad1357172", ProductName = "Baked Beans", SKUNumber = "5323444", ReportedDate = "10/09/2021" });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 8, ExpectedNumber = 10, EANNumber = "Am1357132", ProductName = "Pasta", SKUNumber = "5323444", ReportedDate = "12/09/2021" });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 2, ExpectedNumber = 5, EANNumber = "Ac1357172", ProductName = "Baby Milk", SKUNumber = "5323444", ReportedDate = "15/09/2021" });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 3, ExpectedNumber = 8, EANNumber = "Ab1457172", ProductName = "Rice", SKUNumber = "5323444", ReportedDate = "17/09/2021" });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 7, ExpectedNumber = 10, EANNumber = "Ac1357172", ProductName = "Max Factor All Day Flawless 3in1 45 Warm Almond Foundation", SKUNumber = "5323444", ReportedDate = "15/09/2021" });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 17, ExpectedNumber = 20, EANNumber = "Ab1457172", ProductName = "Maybelline Fit Me Liquid Foundation", SKUNumber = "345224", ReportedDate = "16/09/2021" });
                HttpContext.Session.SetComplexData("Items", list);
            }

            list = HttpContext.Session.GetComplexData<List<IssueModel>>("Items");
            return list.OrderBy(x=>x.ReportedDate).ToList();
        }

        private List<IssueModel> GetDepotCurrentIssues()
        {
            var list = new List<IssueModel>();
            if (!HttpContext.Session.Keys.Contains("DepotItems"))
            {
   
                list.Add(new IssueModel { Store = "Acre Street Local (4686)", ActualNumber = 5, ExpectedNumber = 10, EANNumber = "Af1357173", ProductName = "Pack of chocs", SKUNumber = "5323444", ReportedDate = "10/09/2021", IsDepot=true });
                list.Add(new IssueModel { Store = "Alcester Road Local (4059)", ActualNumber = 6, ExpectedNumber = 8, EANNumber = "Af1357174", ProductName = "Tea Bags", SKUNumber = "5323444", ReportedDate = "11/09/2021", IsDepot = true });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 10, ExpectedNumber = 12, EANNumber = "Ad1357172", ProductName = "Baked Beans", SKUNumber = "5323444", ReportedDate = "10/09/2021", IsDepot = true });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 8, ExpectedNumber = 10, EANNumber = "Am1357132", ProductName = "Pasta", SKUNumber = "5323444", ReportedDate = "12/09/2021", IsDepot = true });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 2, ExpectedNumber = 5, EANNumber = "Ac1357172", ProductName = "Baby Milk", SKUNumber = "5323444", ReportedDate = "15/09/2021", IsDepot = true });
                list.Add(new IssueModel { Store = "Abbey Wood (2327)", ActualNumber = 3, ExpectedNumber = 8, EANNumber = "Ab1457172", ProductName = "Rice", SKUNumber = "5323444", ReportedDate = "17/09/2021", IsDepot = true });
                HttpContext.Session.SetComplexData("DepotItems", list);
            }

            list = HttpContext.Session.GetComplexData<List<IssueModel>>("DepotItems");
            return list;
        }
    }
}
