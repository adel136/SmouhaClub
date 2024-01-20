using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smouhaclub.Models;
using EEAAPortal.Setting;

namespace Namespace
{
    [Area("CPanel")]
    public class ComplainController : Controller
    {
        private readonly SmouhaclubContext _context;

        public ComplainController(SmouhaclubContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View(_context.TblComplaints.ToList());
        }

        public IActionResult Details(string id)
        {
            if(string.IsNullOrWhiteSpace(id))
                return RedirectToAction("Error","Home");

            var rowId = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));

            return View(_context.TblComplaints
                .FirstOrDefault(m => m.ComplaintId == rowId));
        }
    }
}