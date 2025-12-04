(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/firebase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "initFirebase",
    ()=>initFirebase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$compat$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/compat/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app-compat/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$compat$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase/compat/auth/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$compat$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/firebase/compat/database/dist/esm/index.esm.js [app-client] (ecmascript)");
;
;
;
const initFirebase = async ()=>{
    try {
        // 1. Agar pehle se koi App hai, to check karo usme URL hai ya nahi
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].apps.length) {
            const currentApp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].app();
            if (currentApp.options.databaseURL) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]; // Sab sahi hai
            } else {
                console.log("Old connection broken, resetting...");
                await currentApp.delete(); // Purana delete karo
            }
        }
        // 2. Naya Connection banao
        const response = await fetch('/api/config');
        const data = await response.json();
        // Hardcoded URL taaki error ka chance hi na rahe
        const config = {
            ...data.firebase,
            databaseURL: "https://bank-master-data-default-rtdb.asia-southeast1.firebasedatabase.app"
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].initializeApp(config);
        console.log("Firebase initialized with URL:", config.databaseURL);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    } catch (error) {
        console.error("Firebase Init Error:", error);
        return null;
    }
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2d$compat$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_IMAGE",
    ()=>DEFAULT_IMAGE,
    "processRawData",
    ()=>processRawData
]);
const DEFAULT_IMAGE = 'https://i.ibb.co/HTNrbJxD/20250716-222246.png';
function processRawData(data) {
    if (!data) return {
        processedMembers: [],
        communityStats: {}
    };
    const allMembersRaw = data.members || {};
    const allTransactionsRaw = data.transactions || {};
    const allActiveLoansRaw = data.activeLoans || {};
    const allTransactions = Object.values(allTransactionsRaw);
    const allActiveLoans = Object.values(allActiveLoansRaw);
    const processedMembers = [];
    // 1. Members Processing
    for(const memberId in allMembersRaw){
        const member = allMembersRaw[memberId];
        if (member.status !== 'Approved') continue;
        const memberTransactions = allTransactions.filter((tx)=>tx.memberId === memberId);
        // SIP Calculation
        let totalSipAmount = 0;
        memberTransactions.forEach((tx)=>{
            if (tx.type === 'SIP') totalSipAmount += parseFloat(tx.amount || 0);
        });
        // Active Loan Calculation
        const memberActiveLoans = allActiveLoans.filter((loan)=>loan.memberId === memberId && loan.status === 'Active');
        const totalOutstanding = memberActiveLoans.reduce((sum, loan)=>sum + parseFloat(loan.outstandingAmount || 0), 0);
        // Balance on Card
        const displayBalance = totalSipAmount - totalOutstanding;
        processedMembers.push({
            ...member,
            id: memberId,
            balance: displayBalance,
            displayImageUrl: member.profilePicUrl || DEFAULT_IMAGE
        });
    }
    // Sorting: Rich members first
    processedMembers.sort((a, b)=>b.balance - a.balance);
    // 2. Community Stats Calculation
    let totalPureSip = 0;
    allTransactions.forEach((tx)=>{
        if (tx.type === 'SIP') totalPureSip += parseFloat(tx.amount || 0);
    });
    const totalCurrentLoans = allActiveLoans.filter((loan)=>loan.status === 'Active').reduce((sum, loan)=>sum + parseFloat(loan.outstandingAmount || 0), 0);
    const availableBalance = totalPureSip - totalCurrentLoans;
    return {
        processedMembers,
        communityStats: {
            totalSipAmount: totalPureSip,
            totalCurrentLoanAmount: totalCurrentLoans,
            availableCommunityBalance: availableBalance
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function Header() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            background: 'linear-gradient(160deg, #002366 0%, #001233 100%)',
            color: 'white',
            padding: '25px 0 35px 0',
            textAlign: 'center',
            borderBottom: '4px solid #D4AF37',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            marginBottom: '20px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "header-content",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    style: {
                        fontSize: '1.8em',
                        margin: '0 0 5px 0',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                        fontWeight: '800',
                        fontFamily: '"Times New Roman", serif',
                        letterSpacing: '0.5px'
                    },
                    children: "Trust Community Fund"
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.js",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                    style: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: '0',
                        fontWeight: '400',
                        fontSize: '0.9em',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    },
                    children: "ESTD: 23 June 2024"
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.js",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.js",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Header.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Home() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        processedMembers: [],
        communityStats: {}
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            let isMounted = true;
            const run = {
                "Home.useEffect.run": async ()=>{
                    const firebase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initFirebase"])();
                    if (!firebase) return;
                    const auth = firebase.auth();
                    auth.onAuthStateChanged({
                        "Home.useEffect.run": async (u)=>{
                            if (!isMounted) return;
                            if (!u) {
                                router.push('/login');
                            } else {
                                const db = firebase.database();
                                const dbRef = db.ref();
                                dbRef.on('value', {
                                    "Home.useEffect.run": (snapshot)=>{
                                        if (!isMounted) return;
                                        const processed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processRawData"])(snapshot.val());
                                        setData(processed);
                                        setLoading(false);
                                    }
                                }["Home.useEffect.run"]);
                            }
                        }
                    }["Home.useEffect.run"]);
                }
            }["Home.useEffect.run"];
            run();
            return ({
                "Home.useEffect": ()=>{
                    isMounted = false;
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        router
    ]);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#002366',
            fontWeight: 'bold'
        },
        children: "Loading Trust Community..."
    }, void 0, false, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 42,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: '100vh',
            paddingBottom: '80px',
            backgroundColor: 'var(--bg-color)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '20px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "stats-card-luxury",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: 0,
                                color: '#555',
                                fontSize: '0.9em',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            },
                            children: "Available Balance"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.js",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                margin: '10px 0',
                                color: 'var(--success-color)',
                                fontSize: '2.5em',
                                fontWeight: '800'
                            },
                            children: [
                                "₹",
                                (data.communityStats.availableCommunityBalance || 0).toLocaleString('en-IN')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.js",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0,
                                fontSize: '0.9em',
                                color: '#888'
                            },
                            children: [
                                "Total SIP: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "₹",
                                        (data.communityStats.totalSipAmount || 0).toLocaleString('en-IN')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.js",
                                    lineNumber: 61,
                                    columnNumber: 24
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.js",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.js",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '0 20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            color: 'var(--primary-color)',
                            borderBottom: '3px solid var(--accent-gold)',
                            paddingBottom: '5px',
                            display: 'inline-block',
                            fontSize: '1.2em',
                            fontWeight: '800',
                            textTransform: 'uppercase'
                        },
                        children: [
                            "Community Members (",
                            data.processedMembers.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                            gap: '15px',
                            marginTop: '20px'
                        },
                        children: data.processedMembers.map((member, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: index < 3 ? "framed-card-wrapper gold-card" : "framed-card-wrapper",
                                style: {
                                    height: 'auto',
                                    minHeight: '160px'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'white',
                                        padding: '15px',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        border: '1px solid var(--border-color)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: member.displayImageUrl || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_IMAGE"],
                                            style: {
                                                width: '70px',
                                                height: '70px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '3px solid var(--accent-gold)',
                                                marginBottom: '10px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0',
                                                fontWeight: '700',
                                                fontSize: '0.85em',
                                                color: 'var(--primary-color)',
                                                lineHeight: '1.2'
                                            },
                                            children: member.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '5px 0 0 0',
                                                color: member.balance >= 0 ? 'var(--success-color)' : 'var(--danger-color)',
                                                fontSize: '0.9em',
                                                fontWeight: '900'
                                            },
                                            children: [
                                                "₹",
                                                member.balance.toLocaleString('en-IN')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.js",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this)
                            }, member.id, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Home, "3SPcyYMSjezb6UipheUjuG2yA7U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6c0d92da._.js.map