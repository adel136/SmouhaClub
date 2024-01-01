using EEAAPortal.Setting;
using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;

namespace Smouhaclub.Areas.CPanel.Controllers
{
    [Area("CPanel")]
    public class SportsGameController : Controller
    {

        private readonly SmouhaclubContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly string? _image;
        private readonly string? _wwwRoot;

        public SportsGameController(SmouhaclubContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
            var uploadPaths = UploadFiles.GetSectionPaths("SportsGame").ToList();
            _wwwRoot = _env.WebRootPath;
            _image = uploadPaths[0].Value;
        }


        public IActionResult Index()
        {
            return View(_context.TblServices);
        }

        public IActionResult Details(int? id)
        {
            ViewBag.serviceGallery = _context.TblServiceGalleries
                .Where(m => m.ServiceId == id).ToList();

            return View(_context.TblServices
                .FirstOrDefault(m => m.ServiceId == id));
        }

        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public IActionResult Create(TblService model, string rdIsShowable, IFormFile upGamePhoto)
        {
            if (!string.IsNullOrWhiteSpace(model.ServiceName) && !string.IsNullOrWhiteSpace(model.ServiceDescription))
            {
                PublicFunction.CreateDirectory(_wwwRoot, _image);

                //var gamePhoto = "";
                if (upGamePhoto != null)
                {
                    model.ServicePhoto = PublicFunction.SaveFile(upGamePhoto, _wwwRoot, _image);
                }

                model.IsShowable = rdIsShowable == "true" ? true : false;
                _context.Add(model);
                _context.SaveChanges();
                TempData["AddDone"] = true;
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        public IActionResult Edit(string id)
        {
            var rowId =Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));
            var model = _context.TblServices.FirstOrDefault(p => p.ServiceId == rowId);
            if (model != null)
            {
                return View(model);
            }

            return RedirectToAction("Error", "Home", new { area = "CPanel" });
        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public IActionResult Edit(int servicId, TblService model, string rdIsShowable, IFormFile upGamePhoto)
        {
            if (!string.IsNullOrWhiteSpace(model.ServiceName) && !string.IsNullOrWhiteSpace(model.ServiceDescription))
            {
                PublicFunction.CreateDirectory(_wwwRoot, _image);

                //var gamePhoto = "";
                if (upGamePhoto != null)
                {
                    model.ServicePhoto = PublicFunction.SaveFile(upGamePhoto, _wwwRoot, _image);
                }

                model.IsShowable = rdIsShowable == "true" ? true : false;
                _context.Update(model);
                _context.SaveChanges();
                TempData["EditDone"] = true;
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }


    }
}
