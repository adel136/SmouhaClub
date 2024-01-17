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

        // GET: CPanel/Users
        public async Task<IActionResult> Index()
        {
            return View(await _context.TblUsers.ToListAsync());
        }

        // GET: CPanel/Users/Details/5
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

        // GET: CPanel/Users/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CPanel/Users/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TblUser model,string rdIsActive, IFormFile upGamePhoto)
        {
            if (!string.IsNullOrWhiteSpace(model.UserName) && !string.IsNullOrWhiteSpace(model.UserPassword))
            {
                 PublicFunction.CreateDirectory(_wwwRoot, _image);

                if (upGamePhoto != null)
                {
                    model.UserPhoto = PublicFunction.SaveFile(upGamePhoto, _wwwRoot, _image);
                }
                model.IsActive =  rdIsActive == "true" ? true : false;
                model.UserPassword = CryptoHelper.Encrypt(model.UserPassword,SettingHelper.GetKey());
                _context.Add(model);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        // GET: CPanel/Users/Edit/5
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

        // POST: CPanel/Users/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int userid, TblUser model,string userpassword, string oldPassword, IFormFile upGamePhoto, string oldPhoto , string rdIsActive)
        {
            if (userid != model.UserId)
                return NotFound();

            if (!string.IsNullOrWhiteSpace(model.UserName) && !string.IsNullOrWhiteSpace(model.UserPassword))
            {
                try
                {
                     PublicFunction.CreateDirectory(_wwwRoot, _image);

                    if (upGamePhoto != null)
                    {
                        model.UserPhoto = PublicFunction.SaveFile(upGamePhoto, _wwwRoot, _image);
                        string filePath= PublicFunction.GetDirectory(_wwwRoot,_image);
                        PublicFunction.RemoveFile(filePath,oldPhoto);
                    }
                    model.IsActive=rdIsActive == "true" ? true : false;

                    if (userpassword != "********")
                    {
                        model.UserPassword = CryptoHelper.Encrypt(userpassword, SettingHelper.GetKey());
                    }
                    else
                    {
                        model.UserPassword = oldPassword;
                    }

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

        // GET: CPanel/Users/Delete/5
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

        public JsonResult CheckUserNameExist(int userId,string userName)
        {
            if (!string.IsNullOrWhiteSpace(userName))
            {
                bool isExist;
                if (userId == 0)
                {
                    isExist = _context.TblUsers.Any(p => p.UserName == userName);
                } else
                {
                    isExist = _context.TblUsers.Any(p => p.UserName == userName && p.UserId != userId);
                }

                if (isExist)
                    return Json(isExist);

                return Json("0");
            }
            return Json("Error");
        }

        [HttpGet("Users/EmailValidate/{email}")]
        public JsonResult EmailValidate(string email)
        {
            if (!string.IsNullOrWhiteSpace(email))
            {
                var emailExist = _context.TblUsers.Any(p => p.UserEmail == email);
                if(emailExist)
                    return Json("1");

                return Json("0");
            }
            return Json("Error");
        }
    }
}
