// GuildData.ts - Module for my "guild data" class.
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FoundationClasses_1 = __importDefault(require("./FoundationClasses"));
/**
 * Class representing a single guild/server.
 */
var GuildData = /** @class */ (function (_super) {
    __extends(GuildData, _super);
    function GuildData(initData) {
        var _this = _super.call(this) || this;
        _this.blackjackStack = [];
        _this.borderColor = [254, 254, 254];
        _this.casinoStats = {
            largestBlackjackPayout: { amount: 0, date: Date(), userID: '', username: '' },
            largestCoinFlipPayout: { amount: 0, date: Date(), userID: '', username: '' },
            largestRoulettePayout: { amount: 0, date: Date(), userID: '', username: '' },
            largestSlotsPayout: { amount: 0, date: Date(), userID: '', username: '' },
            totalBlackjackPayout: 0,
            totalCoinFlipPayout: 0,
            totalRoulettePayout: 0,
            totalSlotsPayout: 0,
            totalPayout: 0
        };
        _this.gameChannelIDs = [];
        _this.guildShop = { roles: [], items: [] };
        _this.rouletteGame = { bets: [], currentlySpinning: false };
        var IdRegExp = /\d{17,18}/;
        _this.dataBase = initData.dataBase;
        _this.guildName = initData.name.trim();
        _this.id = initData.id.trim();
        _this.memberCount = initData.memberCount;
        if (!IdRegExp.test(_this.id)) {
            var error = new Error();
            error.name = "Guild Id Issue";
            error.message = "You've passed an invalid guild Id to the constructor:\n" + _this.id;
            throw error;
        }
        _this.dataBaseKey = _this.id;
        return _this;
    }
    GuildData.prototype.getFromDataBase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var guildData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dataBase.get(this.dataBaseKey)];
                    case 1:
                        guildData = _a.sent();
                        this.blackjackStack = guildData.blackjackStack;
                        this.borderColor = guildData.borderColor;
                        this.casinoStats = guildData.casinoStats;
                        this.gameChannelIDs = guildData.gameChannelIDs;
                        this.guildShop = guildData.guildShop;
                        this.rouletteGame = guildData.rouletteGame;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.type === 'NotFoundError') {
                            console.log("No entry found for guild by the Id of " + this.id + " with name of " + this.guildName + ", creating one!");
                            console.log(this);
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GuildData.prototype.writeToDataBase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.guildName === '') {
                            error = new Error();
                            error.name = "Non-Initialized Structure";
                            error.message = "You've forgotten to initialize the GuildData structure!";
                            throw error;
                        }
                        console.log('Updating database values for guild: ' + this.guildName);
                        return [4 /*yield*/, this.dataBase.put(this.dataBaseKey, this)];
                    case 1:
                        _a.sent();
                        GuildData.guildsData.set(this.dataBaseKey, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    GuildData.guildsData = new Map();
    return GuildData;
}(FoundationClasses_1.default.DiscordEntity));
exports.default = GuildData;
