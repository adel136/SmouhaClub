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
    public class ComplaintsController : Controller
    {
        private readonly SmouhaclubContext _context;
        public ComplaintsController(SmouhaclubContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            
            return View();
        }
        
        public IActionResult SendComplaint(TblComplaint model)
        {
            var CurrentDate = DateTime.Now.ToString("yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            var xx = DateOnly.ParseExact(CurrentDate, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            model.ComplaintDate = xx;
            _context.TblComplaints.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index","Complaints");
        }
    }
}