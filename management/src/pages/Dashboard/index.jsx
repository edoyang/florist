import React from 'react'

const Dashboard = () => {
  return (
    <div className='dashboard'>
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
                        <h1>Product 1</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <h1>Product 2</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <h1>Product 3</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <h1>Product 4</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="best-sellers-item">
                        <h1>Product 5</h1>
                        <p>1,000 sold</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="dashboard-recent">
            <div className="recent-orders">
                <div className="recent-orders-title">
                    <h1>Recent Orders</h1>
                </div>
                <div className="recent-orders-list">
                    <div className="recent-orders-item">
                        <h1>Order 1</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-orders-item">
                        <h1>Order 2</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-orders-item">
                        <h1>Order 3</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-orders-item">
                        <h1>Order 4</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-orders-item">
                        <h1>Order 5</h1>
                        <p>1,000 sold</p>
                    </div>
                </div>
            </div>

            <div className="recent-reviews">
                <div className="recent-reviews-title">
                    <h1>Recent Reviews</h1>
                </div>
                <div className="recent-reviews-list">
                    <div className="recent-reviews-item">
                        <h1>Review 1</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-reviews-item">
                        <h1>Review 2</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-reviews-item">
                        <h1>Review 3</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-reviews-item">
                        <h1>Review 4</h1>
                        <p>1,000 sold</p>
                    </div>
                    <div className="recent-reviews-item">
                        <h1>Review 5</h1>
                        <p>1,000 sold</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard