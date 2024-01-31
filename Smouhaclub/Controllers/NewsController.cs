using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smouhaclub.Models;
using Smouhaclub.ViewModel;

namespace Smouhaclub.Controllers
{
    public class NewsController : Controller
    {
        private readonly SmouhaclubContext _context;

        public NewsController (SmouhaclubContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            HomeViewModel model = new()
            {
                tblNews = _context.TblNews.Where(p => p.IsShowable == true).OrderByDescending(p => p.NewsDate).AsNoTracking(),
            };

            return View(model);
        }
        public IActionResult Details(int id)
        {
            var news = _context.TblNews.Where(p => p.NewsId == id).FirstOrDefault();
            NewsViewModel model = new()
            {
                NewsTitle = news.NewsTitle,
                IsShowable= news.IsShowable,
                NewsContent = news.NewsContent,
                NewsId =news.NewsId,
                NewsDate = news.NewsDate,
                NewsPhoto = news.NewsPhoto,
                Gallery=_context.TblNewsGalleries.Where(p=>p.NewsId==news.NewsId).ToList(),
            };
            return View(model);
        }
    }
}
