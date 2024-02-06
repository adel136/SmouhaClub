using EEAAPortal.Setting;
using Microsoft.AspNetCore.Mvc;
using Smouhaclub.Areas.CPanel.ViewsModel;
using Smouhaclub.Models;

namespace Smouhaclub.Areas.CPanel.Controllers
{

[Area("CPanel")]
    public class SocialNetworkController : Controller
    {

        private readonly SmouhaclubContext _context;
        public SocialNetworkController(SmouhaclubContext context)
        {
             _context = context;
        }

        public IActionResult Index()
        {
            return View(_context.TblSocialNetwork);
        }

        // GET: CPanel/Social Media/Edit/5
        public IActionResult Edit(string id)
        {
             if(string.IsNullOrWhiteSpace(id))
                return RedirectToAction("Error","Home");

            var rowId = Convert.ToInt32(PublicFunction.ConvertToHexAndDecrypt(id));
            
            var model = _context.TblSocialNetwork.FirstOrDefault(p => p.SocialNetworkID == rowId);
            if (model == null)
            {
                return NotFound();
            }
            return View(model);
        }

        // POST: CPanel/Users/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int linkId,  TblSocialNetwork model ,string txtSocialLink,string rdIsShowable)
        {
            if(linkId != model.SocialNetworkID)
                return NotFound();

            if (!string.IsNullOrWhiteSpace(txtSocialLink))
            {
                model.IsShowable = rdIsShowable == "true" ? true : false;
                model.SocialLink = txtSocialLink;
                _context.Update(model);
                await _context.SaveChangesAsync();
                
                return RedirectToAction("Index","SocialNetwork");
            }
            return RedirectToAction("Index","Home");
        }

    }
}