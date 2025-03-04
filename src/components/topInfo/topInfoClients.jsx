function TopInfoClients({ item }) {
  return (
    <div className="flex flex-row gap-20 pb-5">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Customer Code</label>
          <p className="text-end">{item.customerCode}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Customer Name</label>
          <p className="text-end">{item.customerName}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Alpha Code</label>
          <p className="text-end">{item.alphaCode}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Phone</label>
          <p className="text-end">{item.phone}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Primary Contact
          </label>
          <p className="text-end">{item.primaryContact}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Primary Email</label>
          <p className="text-end">{item.primaryEmail}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Secondary Email
          </label>
          <p className="text-end">{item.secondaryEmail}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Fax</label>
          <p className="text-end">{item.fax}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Address</label>
          <p className="text-end">{item.address}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">City</label>
          <p className="text-end">{item.city}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">State</label>
          <p className="text-end">{item.state}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Zipcode</label>
          <p className="text-end">{item.zipCode}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Balance</label>
          <p className="text-end">{item.balance}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Credit Limit</label>
          <p className="text-end">{item.creditLimit}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Finance Charge
          </label>
          <p className="text-end">{item.financeCharge}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Receive Statments
          </label>
          <p className="text-end">{item.receiveStatements}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Retention</label>
          <p className="text-end">{item.retention}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Resale Exp Date
          </label>
          <p className="text-end">{item.resaleExpDate}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Last Date Billed
          </label>
          <p className="text-end">{item.lastDateBilled}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Last Date Paid
          </label>
          <p className="text-end">{item.lastDatePaid}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Retail Certificate
          </label>
          <p className="text-end">{item.retailCertificate}</p>
        </div>
      </div>
    </div>
  );
}

export default TopInfoClients;
