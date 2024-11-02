document.addEventListener("DOMContentLoaded", function () {
    let dataKaryawan = [
        {
            kode: "A001",
            nama: "Fahri Dualipan",
            email: "Fdlp@gmail.com",
            alamat: "Jl. Ditempat",
            jabatan: "Staff"
        }
        
        // Tambahkan data contoh lainnya jika perlu
    ];

    const tbody = document.querySelector("tbody");

    function renderTable() {
        tbody.innerHTML = "";
        dataKaryawan.forEach((karyawan, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${karyawan.kode}</td>
                <td>${karyawan.nama}</td>
                <td>${karyawan.email}</td>
                <td>${karyawan.alamat}</td>
                <td>${karyawan.jabatan}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="editKaryawan(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="hapusKaryawan(${index})">Hapus</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const kode = document.getElementById("employeeCode").value;
        const nama = document.getElementById("employeeName").value;
        const email = document.getElementById("employeeEmail").value;
        const alamat = document.getElementById("employeeAddress").value;
        const jabatan = document.getElementById("employeePosition").value;

        dataKaryawan.push({ kode, nama, email, alamat, jabatan });
        renderTable();
        this.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
        modal.hide();
    });

    window.editKaryawan = function (index) {
        const karyawan = dataKaryawan[index];
        document.getElementById("employeeCode").value = karyawan.kode;
        document.getElementById("employeeName").value = karyawan.nama;
        document.getElementById("employeeEmail").value = karyawan.email;
        document.getElementById("employeeAddress").value = karyawan.alamat;
        document.getElementById("employeePosition").value = karyawan.jabatan;

        document.querySelector("form").onsubmit = function (event) {
            event.preventDefault();
            dataKaryawan[index] = {
                kode: document.getElementById("employeeCode").value,
                nama: document.getElementById("employeeName").value,
                email: document.getElementById("employeeEmail").value,
                alamat: document.getElementById("employeeAddress").value,
                jabatan: document.getElementById("employeePosition").value
            };
            renderTable();
            this.reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
            modal.hide();
        };
        const modal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
        modal.show();
    };

    window.hapusKaryawan = function (index) {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            dataKaryawan.splice(index, 1);
            renderTable();
        }
    };

    renderTable();
});
