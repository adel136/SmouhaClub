using EEAAPortal.Setting;
using Smouhaclub.Models;

namespace Smouhaclub.Areas.CPanel.Controllers
{
    public class SportsPhotoGalleryController
    {
        private readonly SmouhaclubContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly string? _imageGallery;
        private readonly string? _wwwRoot;
        public SportsPhotoGalleryController(SmouhaclubContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
            var uploadPaths = UploadFiles.GetSectionPaths("SportsGame").ToList();
            _wwwRoot = _env.WebRootPath;
            _imageGallery = uploadPaths[0].Value;
        }

        public void EditPhotoGallery(int serviceId, int[] servicGalleryId, IFormFile[] upGamePhotoGallery)
        {
            if (serviceId > 0)
            {

                _context.TblServiceGalleries.Where(p => p.ServiceId == serviceId).ToList().ForEach(row =>
                {
                    if (!servicGalleryId.Contains(row.ServicGalleryId))
                    {
                        PublicFunction.DeleteFile(_wwwRoot, _imageGallery, row.ServicGalleryPhoto);
                        _context.Remove(row);
                        _context.SaveChanges();
                    }
                });

                if (upGamePhotoGallery.Count() > 0)
                {
                    for (int i = 0; i < upGamePhotoGallery.Length; i++)
                    {
                        _context.TblServiceGalleries.Add(new TblServiceGallery
                        {
                            ServiceId = serviceId,
                            ServicGalleryPhoto = PublicFunction.SaveFile(upGamePhotoGallery[i], _wwwRoot, _imageGallery),
                        });
                        _context.SaveChanges();
                    }
                }
            }
        }
    }
}
