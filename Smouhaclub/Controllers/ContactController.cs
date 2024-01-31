using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;

namespace Smouhaclub.Controllers
{
    public class ContactController : Controller
    {
        private SmouhaclubContext _context;
        public ContactController(SmouhaclubContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            return View();
        }

        public IActionResult Create(ContactU model)
        {

            if (ModelState.IsValid)
            {
                _context.ContactUs.Add(model);
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }

    }
}
