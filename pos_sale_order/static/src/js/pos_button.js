/** @odoo-module **/
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { _t } from "@web/core/l10n/translation";
import {ErrorPopup} from "@point_of_sale/app/errors/popups/error_popup";
import {CreateSale} from "./pos_popup";



class SaleOrderButton extends  ProductScreen{
    static template = "SaleOrderButton";
        setup() {
            super.setup();
        }
    async onClick() {
        if(this.pos.selectedOrder.orderlines.length !== 0 && this.pos.orders[0].partner !== null){
            const { confirmed } = await this.popup.add(CreateSale, {
                title: _t("Create Sale Orders"),
                orderlines: this.pos.selectedOrder.orderlines,
                pos : this.pos
            });
            if(confirmed === true){
            await this.popup.add(ErrorPopup, {
                    title: _t("Sale Order"),
                    body: _t("Sale Order Created"),

                });
            }
        }
        else if(this.pos.selectedOrder.orderlines.length == 0){
        await this.popup.add(ErrorPopup, {
                    title: _t("Empty Order"),
                    body: _t("Please add products."),

                });
        }
        else if(this.pos.orders[0].partner == null){
        await this.popup.add(ErrorPopup, {
                    title: _t("Choose Customer"),
                    body: _t("Please choose a customer."),
                });
        }
    }
    }
ProductScreen.addControlButton({
    component: SaleOrderButton,
    position:['before','OrderlineCustomerNoteButton']
    });

