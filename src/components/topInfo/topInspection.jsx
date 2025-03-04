import moment from "moment";

function TopInfoVehicleInspection({ item }) {
  return (
    <div className="flex flex-row gap-20 pb-5">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Date</label>
          <p className="text-end">{moment(item.date).format("MM/DD/YYYY")}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Employee</label>
          <p className="text-end">{item.employee}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Vehicle</label>
          <p className="text-end">{item.vehicle}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Mileage</label>
          <p className="text-end">{item.mileage}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">HeadLights</label>
          <p className="text-end">{item.headLights ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Tail Lights</label>
          <p className="text-end">{item.tailLights ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Turn Signals</label>
          <p className="text-end">{item.turnSignals ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Brake Lights</label>
          <p className="text-end">{item.brakeLights ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Reflectors</label>
          <p className="text-end">{item.reflectors ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Tires Rims</label>
          <p className="text-end">{item.tiresRims ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Battery</label>
          <p className="text-end">{item.battery ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Radiator</label>
          <p className="text-end">{item.radiator ? "true" : "false"}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Exhaust System
          </label>
          <p className="text-end">{item.exhaustSystem ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Suspension</label>
          <p className="text-end">{item.suspension ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Fuel System</label>
          <p className="text-end">{item.fuelSystem ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Leaks</label>
          <p className="text-end">{item.leaks ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Water Level</label>
          <p className="text-end">{item.waterLevel ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Tranmission</label>
          <p className="text-end">{item.tranmission ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Gauges</label>
          <p className="text-end">{item.gauges ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Horn</label>
          <p className="text-end">{item.horn ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Windshield</label>
          <p className="text-end">{item.windShield ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Windshield Wipers
          </label>
          <p className="text-end">{item.windshieldWipers ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Speedometer</label>
          <p className="text-end">{item.speedometer ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Steering</label>
          <p className="text-end">{item.steering ? "true" : "false"}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Brake System</label>
          <p className="text-end">{item.brakeSystem ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Seat Belts</label>
          <p className="text-end">{item.seatBelts ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Seats</label>
          <p className="text-end">{item.seats ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Heater</label>
          <p className="text-end">{item.heater ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Mirrors</label>
          <p className="text-end">{item.mirrors ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Safety Equipment
          </label>
          <p className="text-end">{item.safetyEquipment ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Accident Kit</label>
          <p className="text-end">{item.accidentKit ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Other</label>
          <p className="text-end">{item.other ? "true" : "false"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Damage</label>
          <p className="text-end">{item.damage}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Remarks</label>
          <p className="text-end">{item.remarks}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Signed By</label>
          <p className="text-end">{item.signedBy}</p>
        </div>
      </div>
    </div>
  );
}

export default TopInfoVehicleInspection;
