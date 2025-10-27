/* eslint-disable react/prop-types */

const ListItemTable = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return <p>No data available to display.</p>;
    }

    const keysArr = Object.keys(data);

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                    <tr>
                        {keysArr.map((key, index) => (
                            <th className="capitalize" key={index} scope="col">
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {keysArr.map((key) => (
                            <td key={key} scope="row" className="text-center">
                                {typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

    );
};

export default ListItemTable;
