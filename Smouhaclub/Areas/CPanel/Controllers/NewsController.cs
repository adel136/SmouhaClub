using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Smouhaclub.Models;

namespace Smouhaclub.Areas.CPanel.Controllers
{
    [Area("CPanel")]
    public class NewsController : Controller
    {
        private readonly SmouhaclubContext _context;

        public NewsController(SmouhaclubContext context)
        {
            _context = context;
        }

        // GET: CPanel/TblNews
        public async Task<IActionResult> Index()
        {
            return View(await _context.TblNews.ToListAsync());
        }

        // GET: CPanel/TblNews/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblNews = await _context.TblNews
                .FirstOrDefaultAsync(m => m.NewsId == id);
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
        public async Task<IActionResult> Create([Bind("NewsId,NewsTitle,NewsContent,NewsPhoto,NewsDate,IsShowable")] TblNews tblNews)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tblNews);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(tblNews);
        }

        // GET: CPanel/TblNews/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblNews = await _context.TblNews.FindAsync(id);
            if (tblNews == null)
            {
                return NotFound();
            }
            return View(tblNews);
        }

        // POST: CPanel/TblNews/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("NewsId,NewsTitle,NewsContent,NewsPhoto,NewsDate,IsShowable")] TblNews tblNews)
        {
            if (id != tblNews.NewsId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tblNews);
                    await _context.SaveChangesAsync();
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

        // GET: CPanel/TblNews/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var tblNews = await _context.TblNews
                .FirstOrDefaultAsync(m => m.NewsId == id);
            if (tblNews == null)
            {
                return NotFound();
            }

            return View(tblNews);
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
