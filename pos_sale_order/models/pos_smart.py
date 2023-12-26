# -*- coding: utf-8 -*-
from odoo import models


class PosSmartView(models.Model):
    _inherit = "pos.session"

    def sale_smart(self):
        """smart button inside pos session form"""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': 'Sale Orders',
            'view_mode': 'tree,form',
            'res_model': 'sale.order',
            'domain': [('create_from_pos', '=', 'true')],
            'context': "{'create': False}"
        }