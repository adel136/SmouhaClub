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
            {
                ViewBag.relatedMembers = _context.TblMemberShips.Where(x => x.MemberId == memberData.MemberId).Count();

                return View(memberData);
            }

            TempData["NoMemberCode"] = true;
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Renew()
        {
            return View();
        }

    }
}
