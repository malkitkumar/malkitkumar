using Microsoft.AspNetCore.Mvc;

namespace reatapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        [HttpGet]
        public int Get(int barcode)
        {
            return 10;
        }
    }
}
