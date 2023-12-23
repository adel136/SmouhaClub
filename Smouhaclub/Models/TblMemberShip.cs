using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Smouhaclub.Models;

[Table("tbl_MemberShip")]
public partial class TblMemberShip
{
    [Key]
    [Column("shipId")]
    public int ShipId { get; set; }

    public int? MemberId { get; set; }

    [StringLength(250)]
    public string? MemberType { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? SubscriptionFee { get; set; }
}
