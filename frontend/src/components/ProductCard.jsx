import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditProductModal from "./EditProductModal";
import { BASE_URL } from "../App";

const ProductCard = ({ product, setProducts }) => {
	const toast = useToast();
	const handleDeleteProduct = async () => {
		try {
			const res = await fetch(BASE_URL + "/products/" + product.id, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id));
			toast({
				status: "success",
				title: "Success",
				description: "Product deleted successfully.",
				duration: 2000,
				position: "top-center",
			});
		} catch (error) {
			toast({
				title: "An error occurred",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top-center",
			});
		}
	};
	return (
		<Card>
			<CardHeader>
				<Flex gap={4}>
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						<Avatar src={product.imgUrl} />

						<Box>
							<Heading size='sm'>{product.name}</Heading>
							<Text>{product.category}</Text>
						</Box>
					</Flex>

					<Flex>
						<EditProductModal product={product} setProducts={setProducts} />
						<IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='Delete product'
							icon={<BiTrash size={20} />}
							onClick={handleDeleteProduct}
						/>
					</Flex>
				</Flex>
			</CardHeader>

			<CardBody>
				<Text>{product.description}</Text>
				<Flex justifyContent="space-between" mt={4}>
					<Text>Quantity: {product.quantity}</Text>
					<Text>Price: ₹{product.price}</Text>
				</Flex>
			</CardBody>
		</Card>
	);
};
export default ProductCard;
