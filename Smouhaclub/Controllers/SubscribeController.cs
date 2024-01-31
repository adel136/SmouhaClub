using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;

namespace Smouhaclub.Controllers
{
    public class SubscribeController : Controller
    {
        private SmouhaclubContext _context;
        public SubscribeController(SmouhaclubContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
