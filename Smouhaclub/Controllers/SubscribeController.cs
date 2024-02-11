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


        public IActionResult CheckMemberShip(string memberCode)
        {
            if(string.IsNullOrWhiteSpace(memberCode))
                return RedirectToAction("Error","Home");

            var memberData = _context.TblMembers.FirstOrDefault(x=>x.MemberCode == memberCode);
            if(memberData != null)
                return View(memberData);

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult Renew(TblMemberShip model)
        {

            return RedirectToAction(nameof(Index));
        }

    }
}
