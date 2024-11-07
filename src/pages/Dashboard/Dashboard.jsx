import CustomTable from "./CustomTable";

const Dashboard = () => {
  return (
    <div>
      <div className="dashboard-header">
        <div className="talkTime">
          <h2>Talktime</h2>
          <p>
            DASHBORD / Products / <span>Talktime</span>
          </p>
        </div>
        <div className="">
          <select name="" id="" className="OptionSelect">
            <option value="ASC">Ascending</option>
            <option value="DSC">Descending</option>
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        <CustomTable />
      </div>
    </div>
  );
};

export default Dashboard;
