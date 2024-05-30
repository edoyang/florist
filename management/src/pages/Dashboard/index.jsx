import React from 'react'
import './style.scss'

const Dashboard = () => {
  return (
    <div className='dashboard page'>
        <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>Oct 11, 2023 - Nov 2022</p>
        </div>

        <div className="dashboard-cards">
            <div className="card">
                <h1>Total Orders</h1>
                <p>1,000</p>
            </div>
            <div className="card">
                <h1>Revenue</h1>
                <p>$1,000,000</p>
            </div>
            <div className="card">
                <h1>Users</h1>
                <p>1,000</p>
            </div>
            <div className="card">
                <h1>Products</h1>
                <p>1,000</p>
            </div>
        </div>

        <div className="dashboard-sale">
            <div className="sale-graph">
                <div className="graph-top">
                    <div className="graph-title">
                        <h1>Sale Graph</h1>
                    </div>
                    <div className="graph-filter">
                        <button>Week</button>
                        <button>Month</button>
                        <button>Year</button>
                    </div>
                </div>

                <div className="graph">
                    <h1>Graph in here</h1>
                </div>
            </div>

            <div className="best-sellers">
                <div className="best-sellers-title">
                    <h1>Best Sellers</h1>
                </div>
                <div className="best-sellers-list">
                    <div className="best-sellers-item">
                        <img src="/" alt="no-image" />
                        <h3>Product 1</h3>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <img src="/" alt="no-image" />
                        <h3>Product 2</h3>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <img src="/" alt="no-image" />
                        <h3>Product 3</h3>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <img src="/" alt="no-image" />
                        <h3>Product 4</h3>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <img src="/" alt="no-image" />
                        <h3>Product 5</h3>
                        <p>1,000 sold</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="recent-orders">
            <div className="recent-orders-title">
                <h1>Recent Orders</h1>
            </div>
            <div className="recent-orders-list">
                <div className="recent-orders-item">
                    <img src="" alt="np-image" />
                    <h3>Order 1</h3>
                    <p>1,000 sold</p>
                </div>
                <div className="recent-orders-item">
                    <img src="" alt="np-image" />
                    <h3>Order 2</h3>
                    <p>1,000 sold</p>
                </div>
                <div className="recent-orders-item">
                    <img src="" alt="np-image" />
                    <h3>Order 3</h3>
                    <p>1,000 sold</p>
                </div>
                <div className="recent-orders-item">
                    <img src="" alt="np-image" />
                    <h3>Order 4</h3>
                    <p>1,000 sold</p>
                </div>
                <div className="recent-orders-item">
                    <img src="" alt="np-image" />
                    <h3>Order 5</h3>
                    <p>1,000 sold</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard