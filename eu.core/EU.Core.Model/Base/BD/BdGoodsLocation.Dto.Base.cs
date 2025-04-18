﻿/*  代码由框架生成,任何更改都可能导致被代码生成器覆盖，可自行修改。
* BdGoodsLocation.cs
*
* 功 能： N / A
* 类 名： BdGoodsLocation
*
* Ver    变更日期 负责人  变更内容
* ───────────────────────────────────
* V0.01  2025/2/27 18:29:40  SahHsiao   初版
*
* Copyright(c) 2025 EU Corporation. All Rights Reserved.
*┌──────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．　│
*│　作者：SahHsiao                                                  │
*└──────────────────────────────────┘
*/

namespace EU.Core.Model.Base;

/// <summary>
/// 库位 (Dto.Base)
/// </summary>
public class BdGoodsLocationBase : BasePoco
{

    /// <summary>
    /// 仓库ID
    /// </summary>
    [Display(Name = "StockId"), Description("仓库ID")]
    public Guid? StockId { get; set; }

    /// <summary>
    /// 库位编号
    /// </summary>
    [Display(Name = "LocationNo"), Description("库位编号"), MaxLength(32, ErrorMessage = "库位编号 不能超过 32 个字符")]
    public string LocationNo { get; set; }

    /// <summary>
    /// 库位名称
    /// </summary>
    [Display(Name = "LocationNames"), Description("库位名称"), MaxLength(32, ErrorMessage = "库位名称 不能超过 32 个字符")]
    public string LocationNames { get; set; }

    /// <summary>
    /// 库位容量
    /// </summary>
    [Display(Name = "LocationCapacity"), Description("库位容量"), Column(TypeName = "decimal(20,2)")]
    public decimal? LocationCapacity { get; set; }

    /// <summary>
    /// 库位状态
    /// </summary>
    [Display(Name = "LocationStatus"), Description("库位状态"), MaxLength(32, ErrorMessage = "库位状态 不能超过 32 个字符")]
    public string LocationStatus { get; set; }

    /// <summary>
    /// 是否默认
    /// </summary>
    [Display(Name = "IsDefault"), Description("是否默认")]
    public bool? IsDefault { get; set; }

    /// <summary>
    /// 备注
    /// </summary>
    [Display(Name = "Remark"), Description("备注"), MaxLength(2000, ErrorMessage = "备注 不能超过 2000 个字符")]
    public string Remark { get; set; }
}
