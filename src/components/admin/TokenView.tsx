import React, { useCallback, useEffect, useState } from "react";
import AdminCreateModal from "./AdminCreateModal";
import AdminBtn from "./subComponents/AdminBtn";
import InputBox from "./subComponents/InputBox";
import { useFormik } from "formik";
import { tokenSchema } from "./createSchemas/adminSchemas";
import { createToken, getTokens } from "../../services/tokenService";
import { useNavigate } from "react-router";

const TokenView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tokens, setTokens] = useState<any[]>([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: tokenSchema,
    onSubmit: (values) => {
      handleCreateToken({
        ...values,
      });
    },
  });

  const handleCreateToken = async (tok: any) => {
    try {
      const { data } = await createToken(tok);
      setTokens([data, ...tokens]);
      formik.resetForm();
      setModalOpen(false);
    } catch (err) {}
  };

  const getAllToken = useCallback(async () => {
    try {
      const { data } = await getTokens();
      setTokens(data);
    } catch (err) {}
  }, []);

  useEffect(() => {
    getAllToken();
  }, [getAllToken]);

  return (
    <div id="adminViews">
      <AdminCreateModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        label="Create Token"
      >
        <div className="modalBody">
          <InputBox
            formik={formik}
            label={"Name"}
            name={"name"}
            onChange={formik.handleChange}
            value={formik?.values?.name}
          />
        </div>
        <div className="modalBottom">
          <div></div>
          <div>
            <AdminBtn onClick={() => formik.handleSubmit()} label="CREATE" />
          </div>
        </div>
      </AdminCreateModal>
      <div className="top">
        <h3 className="tableName">Tokens</h3>
        <div>
          <span className="createBtn" onClick={() => setModalOpen(true)}>
            Create Token
          </span>
        </div>
      </div>
      <div className="tableArea">
        <table>
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Token Name</th>
              <th>Token Image</th>
            </tr>
          </thead>
          <tbody>
            {tokens?.map?.((loc: any, idx) => (
              <tr key={idx}>
                <td>{loc?.id}</td>
                <td>{loc?.name}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {loc?.image ? (
                    <img src={loc?.image} alt="img" width={40} />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenView;
