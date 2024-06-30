package collections.client.inventory;

import java.util.ArrayList;
import java.util.List;

public class InventoryManager {

    List<Product> soldProduct = new ArrayList<Product>();
    List<Product> purchasedProductList = new ArrayList<>();

    public void populateSoldProducts() {
        for (int i = 0; i < 1000; i++) {
            Product product = new Product(i, "test_product_" + i);
            soldProduct.add(product);
            System.out.println("ADDEDD: " + product);
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void displaySoldProducts() {
        for (Product product : soldProduct) {
            System.out.println("PRINTING THE SOLD: " + product);
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

    }
}
