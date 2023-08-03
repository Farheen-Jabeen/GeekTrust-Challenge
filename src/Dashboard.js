import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabledata from "./TableData";
import Search from "./Search";
import Pagination from "./Pagination";
import {
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody
} from "@material-ui/core";
import DeletSelected from "./DeleteSelected";
import "./Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [selectAllUser, setSelectAllUser] = useState(false);
  const [selectCheck, setSelectCheck] = useState([]);

  /* Fetching users */
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsers(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* Search function for searching users by name,email or role */
  const handleSearch = (search) => {
    setSearchQuery(search);
    const filteredRows = users.filter((user) => {
      const newData =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase());
      return newData;
    });
    setFiltered(filteredRows);
    setCurrentPage(1);
  };

  /* page change */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /* Delete function for deleting users by clicking deleteIcon Present in row*/
  const handleDelete = (user_Id) => {
    const deletUser = users.filter((user) => user.id !== user_Id);
    setFiltered(deletUser);
  };

  /* selectRows function to select rows by using checkbox*/
  const handleSelectRows = (user_Id) => {
    let select;
    if (selectCheck.includes(user_Id)) {
      select = selectCheck.filter((user) => {
        return user !== user_Id;
      });
    } else {
      select = [...selectCheck, user_Id];
    }
    setSelectCheck(select);
  };

  /*  selectAll function is shortcut to select multiple users  by one click*/
  const selectAll = () => {
    if (selectCheck.length !== 10) {
      setSelectAllUser(true);
      setSelectCheck(
        pagination_Users.map((user) => {
          return user.id;
        })
      );
    } else {
      setSelectAllUser(false);
      setSelectCheck([]);
    }
  };

  /*  deleteRows function is shortcut to delete multiple users  by one click*/
  const handleDeleteRows = () => {
    setSelectAllUser(false);
    const newData = users.filter((user) => !selectCheck.includes(user.id));
    setFiltered(newData);
    setSelectCheck([]);
  };

  /* setting pages for Pagination*/
  const pages = Math.ceil(filtered.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const pagination_Users = filtered.slice(startIndex, endIndex);

  return (
    <>
      <h3
        className="demo"
        style={{
          backgroundColor: "purple",
          color: "white",
          justifyContent: "center",
          fontFamily: "sans-serif"
        }}
      >
        Welcome to Admin UI
      </h3>

      <Search
        searchQuery={searchQuery}
        handleSearch={(val) => handleSearch(val)}
      />

      <Table className="table">
        <TableHead>
          <TableRow className="column">
            <TableCell
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "purple"
              }}
            >
              <input
                type="checkbox"
                checked={selectAllUser}
                onClick={selectAll}
              />
            </TableCell>
            <TableCell
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "purple"
              }}
            >
              Name
            </TableCell>
            <TableCell
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "purple"
              }}
            >
              Email
            </TableCell>
            <TableCell
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "purple"
              }}
            >
              Role
            </TableCell>
            <TableCell
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "purple"
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tablebody">
          {pagination_Users.map((user) => {
            return (
              <Tabledata
                user={user}
                key={user.id}
                Delete={() => handleDelete(user.id)}
                checked={selectCheck.includes(user.id)}
                selectUser={() => handleSelectRows(user.id)}
              />
            );
          })}
        </TableBody>
      </Table>
      <DeletSelected handleDeleteRows={handleDeleteRows} />
      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Dashboard;
