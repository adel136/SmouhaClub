using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;

namespace Smouhaclub.Controllers
{
    public class SubscribeController(SmouhaclubContext context) : Controller
    {
        private SmouhaclubContext _context = context;
        
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Renew(TblMemberShip model)
        {

            return RedirectToAction(nameof(Index));
        }

    }
}
