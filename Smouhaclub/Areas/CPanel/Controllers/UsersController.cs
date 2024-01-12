using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Smouhaclub.Models;
using EEAAPortal.Setting;

namespace Smouhaclub.Areas.CPanel.Controllers
{
    [Area("CPanel")]
    public class UsersController : Controller
    {
        private readonly SmouhaclubContext _context;
         private readonly IWebHostEnvironment _env;
        private readonly string? _image;
        private readonly string? _wwwRoot;

        public UsersController(SmouhaclubContext context, IWebHostEnvironment env)
        {
            _context = context;
             _env = env;
            var uploadPaths = UploadFiles.GetSectionPaths("Users").ToList();
            _wwwRoot = _env.WebRootPath;
            _image = uploadPaths[0].Value;
        }

        // GET: CPanel/Members
        public async Task<IActionResult> Index()
        {
            return View(await _context.TblUsers.ToListAsync());
        }

        // GET: CPanel/Members/Details/5
        public async Task<IActionResult> Details(string id)
        {
             if(string.IsNullOrWhiteSpace(id))
                return RedirectToAction("Error","Home");

            var rowId = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));
            
            var tblUser = await _context.TblUsers
                .FirstOrDefaultAsync(m => m.UserId == rowId);
            if (tblUser == null)
            {
                return NotFound();
            }

            return View(tblUser);
        }

        // GET: CPanel/Members/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CPanel/Members/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TblUsers model,string rdIsActive, IFormFile upGamePhoto)
        {
            if (!string.IsNullOrWhiteSpace(model.UserName) && !string.IsNullOrWhiteSpace(model.UserPassword))
            {
                 PublicFunction.CreateDirectory(_wwwRoot, _image);

                if (upGamePhoto != null)
                {
                    model.UserPhoto = PublicFunction.SaveFile(upGamePhoto, _wwwRoot, _image);
                }
                model.IsActive =  rdIsActive == "true" ? true : false;
                _context.Add(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }
      
        // GET: CPanel/Members/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
             if(string.IsNullOrWhiteSpace(id))
                return RedirectToAction("Error","Home");

            var rowId = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));
            
            var tblUser = await _context.TblUsers.FirstOrDefaultAsync(p => p.UserId == rowId);
            if (tblUser == null)
            {
                return NotFound();
            }
            return View(tblUser);
        }

        // POST: CPanel/Members/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int userid, TblUsers model)
        {
            if (userid != model.UserId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(model);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TblMemberExists(model.UserId))
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
            return View(model);
        }

        // GET: CPanel/Members/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if(string.IsNullOrWhiteSpace(id))
                return RedirectToAction("Error","Home");

            var rowId = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));
            
            var tblUser = await _context.TblUsers
                .FirstOrDefaultAsync(m => m.UserId == rowId);
            if (tblUser == null)
            {
                return NotFound();
            }
            _context.Remove(tblUser);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        
        private bool TblMemberExists(int id)
        {
            return _context.TblUsers.Any(e => e.UserId == id);
        }

        [HttpGet("Users/EmailValidate/{mail}")]
        public JsonResult EmailValidate(string mail)
        {
            if (!string.IsNullOrWhiteSpace(mail))
            {
                var emailExist = _context.TblUsers.Any(p => p.UserEmail == mail);
                if(emailExist)
                    return Json("1");

                return Json("0");
            }
            return Json("Error");
        }
    }
}
