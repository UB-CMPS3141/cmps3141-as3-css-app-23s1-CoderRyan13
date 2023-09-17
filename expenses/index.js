/*
CMPS3141-HCI - AS3-23S1
Collaborators:
Date: Sept.22.23
*/

import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp({
	data: {
		expenses: [],
		personA: "Neo",
		personB: "Trinity",
		joint: "Joint",
		totalPersonAOwes: 0,
		totalPersonBOwes: 0,
		
		form: {
			payer: "",
			payingTo: "",
			amount: 0.00.toFixed(2),
			description: "",
			pDate: ""
		}
	},

	methods: {
		/**
		 * Currency convert function stub.
		 * In a real app, you would use an API to get the latest exchange rates,
		 * and we'd need to support all currency codes, not just MXN, BZD and GTQ.
		 * However, for the purposes of this assignment lets just assume they travel near by so this is fine.
		 * @param {"MXN" | "BZD" | "GTQ"} from - Currency code to convert from
		 * @param {"MXN" | "BZD" | "GTQ"} to - Currency code to convert to
		 * @param {number} amount - Amount to convert
		 * @returns {number} Converted amount
		 */
		currencyConvert(from, to, amount) {
			const rates = {
				BZD: 1,
				MXN: 8.73,
				GTQ: 3.91
			};

			return amount * rates[to] / rates[from];
		},

		addPayment() {
			const payer = this.form.payer;
			const payingTo = this.form.payingTo;
			const amount = this.form.amount;
			const description = this.form.description;
			const pDate = this.form.pDate;

			let personAOwes = 0;
			if(payer===this.personB && payingTo===this.personA) {
				personAOwes = this.form.amount;
			} else if(payer===this.personB && payingTo===this.joint || payer===this.joint && payingTo===this.personA) {
				personAOwes = this.form.amount/2;
			} else {
				personAOwes = 0;
			}

			let personBOwes = 0;
			if(payer===this.personA && payingTo===this.personB) {
				personBOwes = this.form.amount;
			} else if(payer===this.personA && payingTo===this.joint || payer===this.joint && payingTo===this.personB) {
				personBOwes = this.form.amount/2;
			} else {
				personBOwes = 0;
			}

			this.totalPersonAOwes += personAOwes;

			this.totalPersonBOwes += personBOwes;

			this.expenses.push({
				payer,
				payingTo,
				amount,
				description,
				pDate,
				personAOwes,
				personBOwes
			});
			this.form={};
			//console.log(this.expenses);
		}
	},

	computed: {
		total_balance () {
			let total = 0;

			for (let expense of this.expenses) {
				let trinity_paid = expense.trinity_paid ?? 0;
				let neo_paid = expense.neo_paid ?? 0;
				let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
				let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

				total += (trinity_paid - neo_paid)/2 + trinity_paid_for_neo - neo_paid_for_trinity;
			}

			return total;
		}
	}
}, "#app");
