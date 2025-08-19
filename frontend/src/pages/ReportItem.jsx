import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ItemForm from "../components/ItemForm";

const ReportItem = () => {
  const navigate = useNavigate();

  const onSubmit = async (form) => {
    await api.post("/items", form);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <h2>Report Lost/Found Item</h2>
      <ItemForm onSubmit={onSubmit} />
    </div>
  );
};

export default ReportItem;
