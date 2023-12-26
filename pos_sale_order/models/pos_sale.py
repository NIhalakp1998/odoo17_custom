# -*- coding: utf-8 -*-
from odoo import models, fields


class ConfSetting(models.TransientModel):
    """Add new fields in the pos settings"""
    _inherit = "res.config.settings"

    create_sale = fields.Boolean(config_parameter='pos_sale_order.create_sale', string="Create Sale Order")
