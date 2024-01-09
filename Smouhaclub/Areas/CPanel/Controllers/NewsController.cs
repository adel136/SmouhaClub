using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EEAAPortal.Setting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Smouhaclub.Areas.CPanel.ViewsModel;
using Smouhaclub.Models;

namespace Smouhaclub.Areas.CPanel.Controllers
{
    [Area("CPanel")]
    public class NewsController : Controller
    {
        private readonly SmouhaclubContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly string _wwwRoot;
        private readonly string _photo;
        private readonly string _imgGallary;
        public NewsController(SmouhaclubContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
            _wwwRoot = _env.WebRootPath;
            var uploadPaths = UploadFiles.GetSectionPaths("News").ToList();
            _imgGallary = uploadPaths[0].Value;
            _photo = uploadPaths[1].Value;
        }
        // GET: CPanel/TblNews
        public async Task<IActionResult> Index()
        {
            return View(await _context.TblNews.ToListAsync());
        }
        // GET: CPanel/TblNews/Details/5
        [Route("CPanel/TblNews/Details/{id}")]
        public async Task<IActionResult> Details(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }
            int newsId = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));
            var tblNews = await _context.TblNews
                .FirstOrDefaultAsync(m => m.NewsId == newsId);


            if (tblNews == null)
            {
                return NotFound();
            }

            return View(tblNews);
        }
        // GET: CPanel/TblNews/Create
        public IActionResult Create()
        {
            return View();
        }
        // POST: CPanel/TblNews/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TblNews tblNews, string rdIsShowable, IFormFile upNewsPhoto, IFormFile[] fuFileImage)
        {
            if (!string.IsNullOrWhiteSpace(tblNews.NewsTitle) && !string.IsNullOrWhiteSpace(tblNews.NewsContent))
            {
                PublicFunction.CreateDirectory(_wwwRoot, _photo);
                PublicFunction.CreateDirectory(_wwwRoot, _imgGallary);
                tblNews.IsShowable = PublicFunction.ConvertStringToBoolean(rdIsShowable);
                if (upNewsPhoto != null)
                {
                    tblNews.NewsPhoto = PublicFunction.SaveFile(upNewsPhoto, _wwwRoot, _photo);
                }


                _context.Add(tblNews);
                await _context.SaveChangesAsync();
                await CreateNewsDetails(fuFileImage, tblNews.NewsId);

                return RedirectToAction(nameof(Index));
            }
            return View(tblNews);
        }
        private async Task CreateNewsDetails(IFormFile[] fuFileImage, int newsId)
        {
            if (fuFileImage.Count() > 0)
            {
                for (int i = 0; i < fuFileImage.Length; i++)
                {
                    var imageName = PublicFunction.SaveFile(fuFileImage[i], _wwwRoot, _imgGallary, i);
                    TblNewsGallery model = new()
                    {
                        NewGalleryImage = imageName,
                        NewsId = newsId,
                    };
                    await _context.TblNewsGalleries.AddAsync(model);
                    await _context.SaveChangesAsync();
                }
            }
        }
        // GET: CPanel/TblNews/Edit/5
        public async Task<IActionResult> Edit(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var newsId = PublicFunction.ConvertToHexAndDecrypt(id);
            var tblNews = await _context.TblNews.FirstOrDefaultAsync(p => p.NewsId == Convert.ToInt32(newsId));
            var newsDetails = await _context.TblNewsGalleries.Where(p => p.NewsId == Convert.ToInt32(newsId)).ToListAsync();
            if (tblNews == null)
            {
                return NotFound();
            }
            newsModel model = new()
            {
                NewsId = tblNews.NewsId,
                IsShowable = tblNews.IsShowable,
                NewsContent = tblNews.NewsContent,
                NewsDate = tblNews.NewsDate,
                NewsPhoto = tblNews.NewsPhoto,
                NewsTitle = tblNews.NewsTitle,
                Gallery = newsDetails

            };
            return View(model);
        }
        // POST: CPanel/TblNews/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, newsModel tblNews, string hdinNewsPhoto,
            string rdIsShowable, string[] hdnGalleryImage, string[] hdnGalleryId, IFormFile upNewsPhoto, IFormFile[] fuFileImage)
        {
            if (!string.IsNullOrWhiteSpace(tblNews.NewsTitle) && !string.IsNullOrWhiteSpace(tblNews.NewsContent))
            {
                PublicFunction.CreateDirectory(_wwwRoot, _photo);
                PublicFunction.CreateDirectory(_wwwRoot, _imgGallary);
                try
                {
                    if (upNewsPhoto is not null)
                    {
                        tblNews.NewsPhoto = PublicFunction.SaveFile(upNewsPhoto, _wwwRoot, _photo);
                    }
                    else
                    {
                        tblNews.NewsPhoto = hdinNewsPhoto;
                    }
                    TblNews model = new()
                    {
                        NewsTitle = tblNews.NewsTitle,
                        NewsContent = tblNews.NewsContent,
                        NewsDate = tblNews.NewsDate,
                        NewsId = tblNews.NewsId,
                        NewsPhoto = tblNews.NewsPhoto,
                        IsShowable = PublicFunction.ConvertStringToBoolean(rdIsShowable),
                    };
                    _context.Update(model);
                    await _context.SaveChangesAsync();
                    await EditNewsDetails(fuFileImage, model.NewsId, hdnGalleryImage);


                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TblNewsExists(tblNews.NewsId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(tblNews);
        }
        private async Task EditNewsDetails(IFormFile[] fuFileImage, int newsId, string[] hdnGalleryImage)
        {
            if (fuFileImage.Count() > 0 || hdnGalleryImage.Count() > 0)
            {
                await DeleteTblNewsGallery(newsId, hdnGalleryImage);
                if (hdnGalleryImage.Count() > 0)
                {
                    hdnGalleryImage.ToList().ForEach(photo =>
                    {
                        if (!string.IsNullOrWhiteSpace(photo))
                        {
                            TblNewsGallery model = new()
                            {
                                NewGalleryImage = photo,
                                NewsId = newsId,
                            };
                            _context.TblNewsGalleries.Add(model);
                            _context.SaveChanges();
                        }
                    });
                }
                if (fuFileImage.Count() > 0)
                {
                    for (int i = 0; i < fuFileImage.Length; i++)
                    {
                        var imageName = PublicFunction.SaveFile(fuFileImage[i], _wwwRoot, _imgGallary, i);
                        TblNewsGallery model = new()
                        {
                            NewGalleryImage = imageName,
                            NewsId = newsId,
                        };
                        await _context.TblNewsGalleries.AddAsync(model);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            else
            {
                await DeleteTblNewsGallery(newsId, hdnGalleryImage);
            }
        }
        private async Task DeleteTblNewsGallery(int newsId, string[] hdnGalleryImage)
        {
            _context.TblNewsGalleries.Where(p => p.NewsId == newsId).ToList().ForEach(p =>
            {
                if (!string.IsNullOrWhiteSpace(p.NewGalleryImage))
                {
                    if (hdnGalleryImage.Count() > 0)
                    {
                        if (!hdnGalleryImage.Contains(p.NewGalleryImage))
                        {
                            PublicFunction.DeleteFile(_wwwRoot, _imgGallary, p.NewGalleryImage);
                        }
                    }
                    else
                    {
                        PublicFunction.DeleteFile(_wwwRoot, _imgGallary, p.NewGalleryImage);
                    }

                }
                _context.Remove(p);
                _context.SaveChanges();
            });
        }

        // GET: CPanel/TblNews/Delete/5
        [Route("CPanel/News/Delete/{newsId}")]
        public async Task<IActionResult> Delete(string newsId)
        {
            if (string.IsNullOrWhiteSpace(newsId))
            {
                return NotFound();
            }

            int id = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(newsId));

            var tblNews = await _context.TblNews
                .FirstOrDefaultAsync(m => m.NewsId == id);

            if (tblNews == null)
            {
                return NotFound();
            }
            if (!string.IsNullOrWhiteSpace(tblNews.NewsPhoto))
            {
                PublicFunction.DeleteFile(_wwwRoot, _photo, tblNews.NewsPhoto);
            }
            _context.Remove(tblNews);
            _context.SaveChanges();
            await DeleteTblNewsGallery(tblNews.NewsId, []);
            return RedirectToAction(nameof(Index));
        }

        // POST: CPanel/TblNews/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var tblNews = await _context.TblNews.FindAsync(id);
            if (tblNews != null)
            {
                _context.TblNews.Remove(tblNews);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        private bool TblNewsExists(int id)
        {
            return _context.TblNews.Any(e => e.NewsId == id);
        }
    }
}
