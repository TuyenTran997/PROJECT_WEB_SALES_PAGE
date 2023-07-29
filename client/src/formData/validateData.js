
const checkEmpty = (field) => {
    if (field === undefined || field === null || field === "") {
        return true;
    } else {
        return false;
    }
};

const checkDataEmpty = (req, res, next) => {
    // Lấy dữ liệu từ phía client
    const { userName, email, _password } = req.body;
    // Kiểm tra EmployeeCode không được để trống
    if (checkEmpty(userName)) {
        return res.status(400).json({
            status: 400,
            message: "Tên người dùng không được phép để trống",
        });
    }

    // Kiểm tra EmployeeName không được để trống
    if (checkEmpty(email)) {
        return res.status(400).json({
            status: 400,
            message: "Email không được phép để trống",
        });
    }

    // Kiểm tra EmployeeName không được để trống
    if (checkEmpty(_password)) {
        return res.status(400).json({
            status: 400,
            message: "Mật khẩu không được phép để trống",
        });
    }
    // Nếu các trường đã có dữ liệu thì next
    next();
};

const validateEmail = (req, res, next) => {
    // Lấy email từ client
    const { email } = req.body;
    // Dùng regex
    const isMatch = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    if (isMatch === null) {
        return res.status(400).json({
            status: 400,
            message: "Email không đúng định dạng",
        });
    }
    // Email đúng định dạng
    next();
};

export { loadData }