using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Models;

namespace Smouhaclub.Areas.CPanel.Controllers
{
    [Area("CPanel")]
    public class LoginController : Controller
    {
        private readonly SmouhaclubContext _context;

        public LoginController(SmouhaclubContext context)
        {
            _context = context;
        }


        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Login(string txtLoginName, string txtLoginPassword)
        {
            if (txtLoginName != null && txtLoginPassword != null)
            {
                var user = _context.TblUsers.AsEnumerable().FirstOrDefault(u => u.UserName.Equals(txtLoginName, StringComparison.OrdinalIgnoreCase));
                if (user != null)
                {
                    var password = CryptoHelper.Encrypt(txtLoginPassword, SettingHelper.GetKey());

                    if (user.UserName == txtLoginName && user.UserPassword == password)
                    {
                        if (user.IsActive == true)
                        {
                            HttpContext.Session.SetComplexData("UserId", user.UserId);
                            HttpContext.Session.SetComplexData("UserPhoto", user.UserPhoto);
                            HttpContext.Session.SetComplexData("UserName", user.UserName);
                            return RedirectToAction("Index", "Home");
                        }
                        else
                        {
                            TempData["message"] = "عفوا! هذا المستخدم غير مفعل برجاء التواصل مع مدير النظام ";
                            return RedirectToAction(nameof(Index));
                        }
                    }

                }
            }

            TempData["message"] = "عفوا! بيانات الدخول غير صحيحة ";
            return RedirectToAction(nameof(Index));
        }


        public IActionResult LogOut()
        {
            HttpContext.Session.Clear();
            HttpContext.Session.Remove("UserId");
            return RedirectToAction("Index", "Login");

        }

        public IActionResult ErrorPage()
        {
            int userId = HttpContext.Session.GetComplexData<int>("UserId");
            if (userId != 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction(nameof(Login));
            }

        }

        public IActionResult ErrorPageAdmin(string error)
        {
            ViewBag.error = error;
            return View();
        }
    }
}