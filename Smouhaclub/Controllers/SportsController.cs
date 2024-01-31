using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;
using Smouhaclub.ViewModel;

namespace Smouhaclub.Controllers
{
    public class SportsController : Controller
    {
        private SmouhaclubContext _context;
        public SportsController(SmouhaclubContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {

            var model = (from s in _context.TblServices
                         where s.IsShowable==true
                         select new ServiceViewModel
                         {
                             IsShowable=s.IsShowable,
                             ServiceName=s.ServiceName,
                             ServiceDescription=s.ServiceDescription,
                             ServiceId=s.ServiceId,
                             ServicePhoto = s.ServicePhoto,
                             Gallery = _context.TblServices
                                                .Join(
                                                    _context.TblServiceGalleries,
                                                    sd => sd.ServiceId,
                                                    md => md.ServiceId,
                                                    (sd, md) => new TblServiceGallery
                                                    {
                                                        ServiceId = md.ServiceId,
                                                        ServicGalleryId = md.ServicGalleryId,
                                                        ServicGalleryPhoto = md.ServicGalleryPhoto,
                                                    }
                                                )
                                                .Where(p => p.ServiceId == s.ServiceId)
                                                .ToList(),
                         });
            return View(model);
        }
    }
}
