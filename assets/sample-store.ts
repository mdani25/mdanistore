import { StoreData } from '../src/types';

const sampleStore: StoreData = {
  "storeVersion": "1.0.0",
  "lastUpdated": "2025-10-02T00:00:00Z",
  "apps": [
    {
      "id": "com.mdani.calculator",
      "name": "MDani Calculator",
      "version": "1.0.0",
      "description": "A clean and simple calculator app with basic arithmetic operations and a beautiful Material Design interface.",
      "iconUrl": "https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/icons/i1.png",
      "apkUrl": "https://github.com/mdani25/mdanistore-apps/releases/download/v1.0.0/MDaniCalculator.apk",
      "packageName": "com.mdani.calculator",
      "size": "4.2 MB",
      "minAndroidVersion": "21",
      "category": "Productivity",
      "screenshots": [
        "https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/screenshots/ss1.png"
      ],
      "changelog": "- Initial release\n- Basic arithmetic operations\n- Clean Material Design interface"
    },
    {
      "id": "com.mdani.expensetracker",
      "name": "My Expense Tracker",
      "version": "2.0.0",
      "description": "Track your daily expenses and manage your budget with this simple and intuitive expense tracking app.",
      "iconUrl": "https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/icons/expensetracker.png",
      "apkUrl": "https://github.com/mdani25/mdanistore-apps/releases/download/v2.0.0/MyExpenseTracker.apk",
      "packageName": "com.mdani.expensetracker",
      "size": "6.1 MB",
      "minAndroidVersion": "21",
      "category": "Finance",
      "screenshots": [
        "https://raw.githubusercontent.com/mdani25/mdanistore-apps/main/screenshots/expensetracker1.png"
      ],
      "changelog": "- Major UI redesign\n- Added budget planning\n- Enhanced reporting features\n- Performance improvements"
    }
  ]
};

export default sampleStore;