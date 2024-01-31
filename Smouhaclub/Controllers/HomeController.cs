using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;
using Smouhaclub.ViewModel;
using System.Diagnostics;

namespace Smouhaclub.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly SmouhaclubContext _context;
        public HomeController(ILogger<HomeController> logger, SmouhaclubContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            HomeViewModel model = new()
            {
                tblNews = _context.TblNews.Where(p => p.IsShowable == true).OrderByDescending(p => p.NewsDate).Take(10),
                tblService = _context.TblServices.Where(p => p.IsShowable == true).OrderByDescending(p => p.ServiceId).Take(6),
            };


            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
