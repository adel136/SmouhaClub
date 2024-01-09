using Microsoft.EntityFrameworkCore;
using Smouhaclub.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Smouhaclub.Areas.CPanel.ViewsModel
{
    public class ServicesModels : TblService
    {
        public IEnumerable<TblServiceGallery>? ServiceGalleries { get; set; }
    }
}
