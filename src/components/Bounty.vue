<template>
    <div class="mt-2">
        <h2 class="font-bold text-4xl">Send sats to {{ dev }}</h2>
        <div v-if="data_url == ''">
            <input type="number"
                    placeholder="Amount"
                    v-model="amount"
                    class="mt-2 px-4 py-3 leading-5 border rounded-md text-black font-bold" />
            <button type="button" 
                    class="px-6 py-3 sm:ml-1 md:ml-2 mt-2 rounded-md font-semibold bg-white text-black"
                    @click="generateInvoice()">
                    Generate Invoice
            </button>
        </div>
        <div v-else class="grid grid-cols-1 place-items-center mt-3">
            <div class="w-full">
                <img :src="data_url" alt="QRCode" class="m-auto" />
                <div class="select-all px-2 md:w-1/3 text-base break-words m-auto mt-2">
                {{ invoice.payment_request }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import QRious from 'qrious'
    import devs from '@/dev'

    export default {
        name: 'Bounty',

        props: ['dev'],

        data() {
            return {
                amount: 0,
                invoice: {},
                data_url: '',
                qrcode: new QRious({ size: 300 })
            }
        },

        methods: {
            generateInvoice() {
                if (this.amount <= 0 || devs.filter(x => x.user === this.dev).length < 1) {
                    return
                }
                devs.map(x => {
                    if (x.user == this.dev) {
                        let url = 'https://lnpay.co/v1/wallet/' + x.waki + '/invoice'
                        let data = JSON.stringify({"num_satoshis": parseInt(this.amount), "memo":"Donation from helpbitco.in"})
                        axios.post(url, data, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Basic ' + btoa(x.pk + ':')
                            }
                        }).then((response) => {
                            this.invoice = {
                                payment_request: response.data.payment_request,
                                expiry: response.data.expiry,
                                num_satoshis: response.data.num_satoshis
                            }
                            this.qrcode.value = this.invoice.payment_request
                            this.data_url = this.qrcode.toDataURL()
                        })
                    }
                })
            }
        }
    }
</script>